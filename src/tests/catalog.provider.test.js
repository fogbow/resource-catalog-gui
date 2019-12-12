import React from 'react';
import axios from 'axios';

import CatalogProvider from '../providers/catalog.provider';
import { env } from '../defaults/rcs.conf';

const endpoint = env.rcsUrl.concat('/rcs/members');

jest.mock('axios');

afterEach(() => {
  jest.clearAllMocks();
});

test('calls axios get with the members endpoint', async () => {
  axios.get.mockResolvedValueOnce({
    data: { members: ['member1', 'member2', 'member3'] }
  });

  let provider = new CatalogProvider();
  const providerSpy = jest.spyOn(provider, 'get');

  try {
    await provider.get();
  } catch(error) {
    console.log(error);
  }

  expect(providerSpy).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(endpoint);
});

test('calls axios get with service endpoint', async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      services: [
        { 'serviceType': 'ras', 'location': 'path/to/ras' },
        { 'serviceType': 'as', 'location': 'path/to/as' },
        { 'serviceType': 'fns', 'location': 'path/to/fns' }
      ] }
  });

  let provider = new CatalogProvider();
  const providerSpy = jest.spyOn(provider, 'getCatalog');
  const memberName = 'member1';

  try {
    await provider.getCatalog(memberName);
  } catch(error) {
    console.log(error);
  }

  expect(providerSpy).toHaveBeenCalledTimes(1);
  expect(providerSpy).toHaveBeenCalledWith(memberName);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(endpoint.concat('/', memberName));
});
