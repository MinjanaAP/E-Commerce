import React from 'react';

const TimelineSteps = ({ step, order, isCompleted, isCurrent, isLastStep, icon, description }) => {
    const iconBgColor = isCompleted || isCurrent ? `bg-${icon.bgColor}` : 'bg-gray-100';
    const iconTextColor = isCompleted || isCurrent ? 'text-white' : `text-${icon.textColor}`;
    const connectorColor = isCompleted ? 'bg-blue-500' : 'bg-gray-200';
    const labelTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';
    const descriptionTextColor = isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500';

    return (
        <li className="relative mb-6 sm:mb-0 sm:pl-10" data-testid="timeline-step">
            <div className="flex items-center">
                <div
                    className={`z-10 flex items-center justify-center w-6 h-6 ${step?.status === 'completed'
                        ? 'bg-green-900 text-green-100'
                        : step?.status === 'pending'
                            ? 'bg-red-700 text-red-100'
                            : step?.status === 'processing'
                                ? 'bg-blue-600 text-blue-100'
                                : 'bg-indigo-900 text-indigo-100'
                        } rounded-full ring-0 ring-white shrink-0`}
                    data-testid="step-icon"
                >
                    <i className={`ri-${icon.iconName} text-xl`} data-testid="step-icon-name"></i>
                </div>
                {!isLastStep && (
                    <div className={`hidden sm:flex w-full h-0.5 ${connectorColor}`} data-testid="connector"></div>
                )}
            </div>
            <div className="mt-3 sm:pe-8">
                <h3 className={`font-medium text-base ${labelTextColor}`} data-testid="step-label">
                    {step.label}
                </h3>
                <time
                    className="block mb-2 text-sm font-normal leading-none text-gray-400"
                    data-testid="step-time"
                >
                    {order.updatedAt
                        ? new Date(order.updatedAt).toLocaleString()
                        : 'Time'}
                </time>
                <p className={`text-base font-normal ${descriptionTextColor}`} data-testid="step-description">
                    {description}
                </p>
            </div>
        </li>
    );
};

export default TimelineSteps;
