import * as React from 'react';

interface ControlProps {
  position: 'topleft' | 'topright' | 'bottomright' | 'bottomleft';
  children: React.ReactNode;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component<ControlProps> {}&