// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { WebSiteManagementClient } from '@azure/arm-appservice';
import { TokenCredentials } from '@azure/ms-rest-js';

import { throwNotImplementedError } from './throwNotImplementedError';

const createWebAppAzureFunctionService = (token: string, subscriptionId: string) => {
  const tokenCredentials = new TokenCredentials(token);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const webSiteManagementClient = new WebSiteManagementClient(tokenCredentials, subscriptionId);

  const createOrUpdate = async () => {
    throwNotImplementedError();
  };

  const deleteMethod = async () => {
    throwNotImplementedError();
  };

  const get = async () => {
    throwNotImplementedError();
  };

  const list = async () => {
    throwNotImplementedError();
  };

  const listByResourceGroup = async () => {
    throwNotImplementedError();
  };

  const update = async () => {
    throwNotImplementedError();
  };

  /**
   * Creates or updates a Azure Function WebApp for given resource group
   */
  const provision = async () => {
    throwNotImplementedError();
  };

  return {
    createOrUpdate,
    deleteMethod,
    get,
    list,
    listByResourceGroup,
    update,
    provision,
  };
};

export type WebAppAzureFunctionService = ReturnType<typeof createWebAppAzureFunctionService>;
