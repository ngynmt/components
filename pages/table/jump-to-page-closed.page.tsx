// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';

import Pagination from '~components/pagination';
import Table from '~components/table';

import { generateItems, Instance } from './generate-data';

const allItems = generateItems(100);
const PAGE_SIZE = 10;

export default function JumpToPageClosedExample() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [jumpToPageErrorText, setJumpToPageErrorText] = useState('');

  const totalPages = Math.ceil(allItems.length / PAGE_SIZE);
  const startIndex = (currentPageIndex - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentItems = allItems.slice(startIndex, endIndex);

  return (
    <Table
      header={<h1>Jump to Page - Closed Pagination (100 items, 10 pages)</h1>}
      columnDefinitions={[
        { header: 'ID', cell: (item: Instance) => item.id },
        { header: 'State', cell: (item: Instance) => item.state },
        { header: 'Type', cell: (item: Instance) => item.type },
        { header: 'DNS Name', cell: (item: Instance) => item.dnsName || '-' },
      ]}
      items={currentItems}
      pagination={
        <Pagination
          currentPageIndex={currentPageIndex}
          pagesCount={totalPages}
          onChange={({ detail }) => {
            setCurrentPageIndex(detail.currentPageIndex);
            setJumpToPageErrorText('');
          }}
          jumpToPage={true}
          jumpToPageErrorText={jumpToPageErrorText}
          onJumpToPageClick={({ detail }) => {
            if (!detail.requestedPageAvailable) {
              setJumpToPageErrorText(
                `Page ${detail.requestedPageIndex} does not exist. Maximum page is ${totalPages}.`
              );
            } else {
              setJumpToPageErrorText('');
            }
          }}
        />
      }
    />
  );
}
