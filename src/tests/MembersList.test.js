import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';

import MembersList from '../components/MembersList';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders members list based on catalog passed as props', () => {
  const catalog = {
    member1: [
      { serviceType: 'ras', location: 'path/to/ras' },
      { serviceType: 'as', location: 'path/to/as' },
      { serviceType: 'fns', location: 'path/to/fns' }
    ],
    member2: [
      { serviceType: 'ras', location: 'path/to/ras' },
      { serviceType: 'as', location: 'path/to/as' },
      { serviceType: 'fns', location: 'path/to/fns' }
    ]
  };

  act(() => {
    render(<MembersList catalog={catalog} />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
    "<div>
      <div class=\\"row\\">
        <div class=\\"col\\">
          <div class=\\"btn-group members-list\\" role=\\"group\\"><button type=\\"button\\" class=\\"btn btn-default dropdown-toggle\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"false\\" aria-expanded=\\"true\\" id=\\"membersDropdown\\">member1</button>
            <div>
              <ul class=\\"dropdown-menu order-dropdown\\" aria-labelledby=\\"membersDropdown\\">
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/ras\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Resource Allocation Service</a></li>
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/as\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Authentication Service</a></li>
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/fns\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Federated Network Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class=\\"row\\">
        <div class=\\"col\\">
          <div class=\\"btn-group members-list\\" role=\\"group\\"><button type=\\"button\\" class=\\"btn btn-default dropdown-toggle\\" data-toggle=\\"dropdown\\" aria-haspopup=\\"false\\" aria-expanded=\\"true\\" id=\\"membersDropdown\\">member2</button>
            <div>
              <ul class=\\"dropdown-menu order-dropdown\\" aria-labelledby=\\"membersDropdown\\">
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/ras\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Resource Allocation Service</a></li>
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/as\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Authentication Service</a></li>
                <li class=\\"btn btn-link dropdown-item\\"><a class=\\"btn btn-link\\" href=\\"http://localhost:8081path/to/fns\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">Federated Network Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>"
  `);
});

test("renders local member correctly", () => {
  const catalog = {
    member1: [{ serviceType: "local", location: "path/to/local" }]
  };

  act(() => {
    render(<MembersList catalog={catalog} />, container);
  });

  const button = container.querySelector('button');
  expect(button.innerHTML).toBe("member1 (local)");
});
