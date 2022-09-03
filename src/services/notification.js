export const requestPermission = async () => {
  if ('Notification' in window) {
    const status = await Notification.requestPermission();

    if (status === 'denied') {
      console.log('Notification permission Denied');
    }

    if (status === 'default') {
      console.log('Notification permission closed');
    }
  }
};

export const showNotification = async ({ title, options, url }) => {
  const notif = new Notification(title, options);
  notif.onclick = () => {
    window.open(url, '_blank');
  };
};
