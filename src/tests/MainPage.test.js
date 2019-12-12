import React from 'react';
import axios from 'axios';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import CatalogProvider from '../providers/catalog.provider';
import MainPage from '../pages/MainPage';
import { env } from '../defaults/rcs.conf';

const endpoint = env.rcsUrl.concat('/rcs/members');

jest.mock('../providers/catalog.provider');

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  CatalogProvider.mockImplementation(() => {
    return {
      get: () => {
        return {data: { members: ['member1', 'member2', 'member3'] }};
      },
      getCatalog: () => {
        return {
          data: {
            services: [
              { 'serviceType': 'ras', 'location': 'path/to/ras' },
              { 'serviceType': 'as', 'location': 'path/to/as' },
              { 'serviceType': 'fns', 'location': 'path/to/fns' }
            ] }
          }
      },
    };
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('instantiates catalog using CatalogProvider on mounting', async () => {
  act(() => {
    render(<MainPage />, container);
  });

  expect(CatalogProvider).toHaveBeenCalled();
});
