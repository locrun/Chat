class WebSocketApi {
  static socket: WebSocket | null = null;

  static createConnection(token: string) {
    const socket = new WebSocket(
      `wss://lms-api.mdev.uz/connect/?token=${token}`
    );

    socket.onopen = function () {
      socket.send(JSON.stringify({ Authorization: token }));
      console.log('connect');
    };

    socket.onclose = function () {
      console.log('disconnected');
    };

    this.socket = socket;
  }

  static sendDataToServer(type: string, data: unknown) {
    if (WebSocketApi.socket) {
      const messageData = {
        data: data,
        type: type
      };
      WebSocketApi.socket.send(JSON.stringify(messageData));
      console.log('Message sent:', messageData);
    } else {
      console.log('Socket is not connected.');
    }
  }
}

export default WebSocketApi;
