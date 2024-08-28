import moment from "moment";

const getDateLabel = (timestamp) => {
  const messageDate = moment(timestamp);
  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'days').startOf('day');

  if (messageDate.isSame(today, 'day')) {
    return 'Today';
  } else if (messageDate.isSame(yesterday, 'day')) {
    return 'Yesterday';
  } else if (messageDate.isSame(moment(), 'year')) {
    return messageDate.format('MMM D'); // Example: Aug 27
  } else {
    return messageDate.format('MMM D, YYYY'); // Example: Aug 27, 2023
  }
};

export default getDateLabel;
