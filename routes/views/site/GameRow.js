import m from "mithril";

const GameRow = {
  view: function (vnode) {
    const game = vnode.attrs.event;
    console.log('GameRow', game, vnode.attrs)
    return m("tr", [
      m("td", game.name),
      m("td", game.status),
      m("td", game.completedAt ? new Date(game.completedAt).toLocaleString() : 'N/A'),
      m("td", game.createdAt ? new Date(game.createdAt).toLocaleString() : 'N/A'),
      m("td", game.maxPlayers),
      m("td", game.gameLength),
      m("td", game.gameType),
      m("td", [
        m(
          m.route.Link,
          {
            className: "text-blue-500",
            href: "/game/" + game.id,
          },
          "View Details"
        ),
      ]),
    ]);
  },
};

export default GameRow;
