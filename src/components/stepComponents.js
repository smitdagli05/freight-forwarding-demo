// freight-forwarding-demo/src/components/stepComponents.js

import React, { lazy } from 'react';

// Lazy load step components for better performance
const OutlookView = lazy(() => import('./OutlookView'));
const ProcessingView = lazy(() => import('./ProcessingView'));
const CarrierRequestView = lazy(() => import('./CarrierRequestView'));
const QuoteManagementView = lazy(() => import('./QuoteManagementView'));
const RealTimeCollaborationView = lazy(() => import('./RealTimeCollaborationView'));
const DocumentGenerationView = lazy(() => import('./DocumentGenerationView'));
const NotificationView = lazy(() => import('./NotificationView'));
const CompletionView = lazy(() => import('./CompletionView'));
const StatusBoard = lazy(() => import('./StatusBoard'));

// Mapping of component identifiers to actual components
const stepComponents = {
  OutlookView,
  ProcessingView,
  CarrierRequestView,
  QuoteManagementView,
  RealTimeCollaborationView,
  DocumentGenerationView,
  NotificationView,
  CompletionView,
  StatusBoard,
  // Add more mappings as needed
};

export default stepComponents;
