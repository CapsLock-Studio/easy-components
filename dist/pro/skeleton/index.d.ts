import React from 'react';
import type { DescriptionsPageSkeletonProps } from './components/Descriptions';
import { DescriptionsSkeleton, TableItemSkeleton, TableSkeleton } from './components/Descriptions';
import type { ListPageSkeletonProps } from './components/List';
import ListPageSkeleton, { ListSkeleton, ListSkeletonItem, ListToolbarSkeleton, PageHeaderSkeleton } from './components/List';
declare const ProSkeleton: React.FC<ListPageSkeletonProps & DescriptionsPageSkeletonProps & {
    type?: 'list' | 'result' | 'descriptions';
    active?: boolean;
}>;
export { ProSkeleton, ListPageSkeleton, ListSkeleton, ListSkeletonItem, PageHeaderSkeleton, ListToolbarSkeleton, DescriptionsSkeleton, TableSkeleton, TableItemSkeleton, };
export default ProSkeleton;
