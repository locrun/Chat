class WebSocketApi {
  static socket: WebSocket | null = null;

  static createConnection(token: string) {
    const socket = new WebSocket(
      `wss://lms-api.mdev.uz/connect/?token=${token}`
    );

    socket.onopen = function () {
      socket.send(JSON.stringify({ Authorization: token }));
      console.log('Соединение открыто.');
    };
    socket.onclose = function () {
      console.log('Соединение закрыто.');
    };

    socket.onerror = function (error) {
      console.error('Ошибка:', error);
    };
    this.socket = socket;
  }
}

export default WebSocketApi;
