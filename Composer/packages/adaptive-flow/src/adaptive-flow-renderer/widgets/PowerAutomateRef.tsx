// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** @jsx jsx */
import { WidgetComponent, WidgetContainerProps } from '@bfc/extension-client';
import { jsx } from '@emotion/core';
import React, { useMemo } from 'react';

export const PowerAutomateRef: WidgetComponent<WidgetContainerProps> = ({ id, onEvent, data }) => {
  const content = useMemo(() => {
    return data.flow.displayName;
  }, [data.flow]);

  return (
    <div>
      <span>{content}</span>
    </div>
  );
};
