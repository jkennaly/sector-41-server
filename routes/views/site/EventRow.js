import m from "mithril";

const EventRow = {
  view: function (vnode) {
    const event = vnode.attrs.event;
    return m("tr", [
      m("td", event.name),
      m("td", event.date),
      m("td", event.location),
      m("td", [
        m(
          m.route.Link,
          {
            className: "text-blue-500",
            href: "/event/" + event.id,
          },
          "View Details"
        ),
      ]),
    ]);
  },
};

export default EventRow;
