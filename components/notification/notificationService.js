import Notification from './notificationModel.js';

async function getNotificationsByUser(userId) {
  return Notification.findAll({ where: { userId } });
}

// async function addNotification(notification) {
//   return Notification.create(notification);
// }

export default { getNotificationsByUser };