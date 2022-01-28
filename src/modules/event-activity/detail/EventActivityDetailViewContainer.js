import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import EventActivityDetailScreen from './EventActivityDetailView';
import { 
  eventActivityIndex,
  eventActivityShow,
  eventActivityLike,
  eventActivityUnlike,
  eventActivityShare,
  eventActivityListComment,
  eventActivityComment,
 } from '../EventActivityState';

export default compose(
  connect(
    (state) => {
      return ({
        isLoading: state.eventActivity.isLoading,
        dataIndex: state.eventActivity.dataIndex,
        dataShow: state.eventActivity.dataShow,
        dataListComment: state.eventActivity.dataListComment,
        listCommentPage: state.eventActivity.listCommentPage,
        listCommentPerPage: state.eventActivity.listCommentPerPage,
      });
    },
    { 
      eventActivityIndex,
      eventActivityShow,
      eventActivityLike,
      eventActivityUnlike,
      eventActivityShare,
      eventActivityListComment,
      eventActivityComment,
    }
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(EventActivityDetailScreen);
