import m from "mithril";

const SessionRow = {
  view: function (vnode) {
    const session = vnode.attrs.event;
    return m("tr", [
      m("td", session.name),
      m("td", session.status),
      m("td", session.completedAt ? new Date(session.completedAt).toLocaleString() : 'N/A'),
      m("td", session.createdAt ? new Date(session.createdAt).toLocaleString() : 'N/A'),
      m("td", [
        m(
          m.route.Link,
          {
            className: "text-blue-500",
            href: "/session/" + session.id,
          },
          "View Details"
        ),
      ]),
    ]);
  },
};

export default SessionRow;
