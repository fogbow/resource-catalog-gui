import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import ServicesList from "../components/ServicesList";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders services list based on props", () => {
  const services = [
    { serviceType: "ras", location: "/path/to/ras" },
    { serviceType: "as", location: "/path/to/as" },
    { serviceType: "fns", location: "/path/to/fns" }
  ];

  act(() => {
    render(<ServicesList services={services} />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <ul class=\\"dropdown-menu order-dropdown\\" aria-labelledby=\\"membersDropdown\\">
        <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081/path/to/ras\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Resource Allocation Service</a></li>
        <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081/path/to/as\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Authentication Service</a></li>
        <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081/path/to/fns\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Federated Network Service</a></li>
      </ul>
    </div>"
  `);
});

test("renders local service path correctly", () => {
  const services = [
    { serviceType: "local", location: "http://path.to.local/doc" }
  ];

  act(() => {
    render(<ServicesList services={services} />, container);
  });

  const link = container.querySelector("a");
  expect(link.innerHTML).toBe("Local Provider Catalog");
});
