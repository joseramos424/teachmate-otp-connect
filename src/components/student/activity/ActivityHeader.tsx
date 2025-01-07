import React from 'react';

interface ActivityHeaderProps {
  title: string;
}

export const ActivityHeader = ({ title }: ActivityHeaderProps) => {
  return (
    <h2 className="text-2xl font-semibold">{title}</h2>
  );
};