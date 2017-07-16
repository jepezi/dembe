// @flow
import React from 'react'
import {createPaginationContainer, graphql} from 'react-relay'
import Post from './Post'

class PostList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isLoading: this.props.relay.isLoading()}
  }
  render() {
    const {viewer} = this.props
    const {isLoading} = this.state
    return (
      <div>
        {viewer.posts.edges.map(e =>
          <Post
            key={`post_${e.node.title}`}
            data={e.node}
          />
        )}
        <div style={{marginTop: 16}}>
          <button onClick={this._loadMore}>
            More {isLoading ? '...' : ''}
          </button>
        </div>
      </div>
    )
  }
  _loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.setState(s => ({isLoading: true}))

    this.props.relay.loadMore(
      10, // Fetch the next 10 feed items
      e => {
        this.setState(s => ({isLoading: false}))
        if (e != null) {
          console.log('error _loadMore', e)
        }
      },
    );
  }
}

export default createPaginationContainer(
  PostList,
  graphql`
    fragment PostList_viewer on Viewer {
      id
      posts(
        first: $count,
        after: $cursor,
      ) @connection(key: "PostList_posts") {
        edges {
          node {
            id,
            title,
            description,
          }
        },
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    }
  `,
  {
    getFragmentVariables(prevVars, totalCount) {
      // console.warn('getFragmentVariables', prevVars, totalCount);
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, vars, fragmentVariables) {
      // console.warn('getVariables', vars, fragmentVariables);
      return {
        count: vars.count,
        cursor: vars.cursor,
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        // orderBy: fragmentVariables.orderBy,
      };
    },
    query: graphql`
      query PostListPaginationQuery(
        $count: Int
        $cursor: String
      ) {
        viewer {
          # You could reference the fragment defined previously.
          ...PostList_viewer
        }
      }
    `
  }
)
