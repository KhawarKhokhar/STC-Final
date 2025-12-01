// components/TaskSidebar.tsx

import React from "react";
// Import the revised TaskItem component
interface TaskItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  active?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  icon,
  title,
  description,
  active,
}) => {
  return (
    <div
      className={`relative py-4 pr-4 pl-0 cursor-pointer transition-colors duration-200 
                  ${active ? "" : "hover:bg-[#FBEFDC]/50"}`}
    >
      {/* 1. The main content wrapper, which provides the necessary left padding */}
      <div className="pl-4">
          <div className="flex items-start space-x-2">
            {/* The Icon is vertically centered with the title */}
            <div className="pt-0.5">{icon}</div>
            <h4 className="font-medium text-gray-700 text-lg leading-snug">
              {title}
            </h4>
          </div>
          <p className="text-gray-600 text-sm pl-7 leading-snug">
            {description}
          </p>
      </div>

      {/* 2. Vertical Highlight Bar (Active State Only) */}
      {active && (
        <div
          className="absolute top-0 right-0 h-full w-1 rounded-full"
          style={{
            // Custom linear gradient for the purple/lilac bar
            background: 'linear-gradient(to top, #7E8FF2, #A8B1FC)',
            // Added vertical padding to match the image's spacing from top/bottom
            top: '1rem',
            bottom: '1rem',
            height: 'calc(100% - 2rem)', 
          }}
        ></div>
      )}
    </div>
  );
};

export const TaskSidebar: React.FC = () => {
  return (
    // Removed the horizontal padding (pr-4) on the wrapper so the bar can go to the edge
    <div className="py-4"> 
      
      {/* Heading */}
      <h3 className="text-xl font-medium text-gray-800 mb-8 tracking-wider uppercase pl-4">
        TASK
        <br /> MANAGEMENT
      </h3>

      {/* Task List - space-y-0 to reduce gap, but using Item's internal padding */}
      <div className="space-y-0 divide-y divide-[#FBEFDC]">
        
        {/* Task 01 - Active State */}
        <TaskItem
          icon={
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#6A6A6A" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="14" width="3" height="6" rx="0.5" /> {/* bar 1 (short) */}
              <rect x="10" y="10" width="3" height="10" rx="0.5" /> {/* bar 2 (medium) */}
              <rect x="15" y="6" width="3" height="14" rx="0.5" /> {/* bar 3 (tall) */}
            </svg>
          }
          title="Task 01"
          description="Description. Lorem ipsum dolor sit amet, consectetur."
          active={true} // Set active to display the vertical bar
        />

        {/* Task 02 */}
        <TaskItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="#6A6A6A" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* This icon is a simple mountain shape, matching the image */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4L3 20h18L12 4z" fill="none"/> 
              <path d="M12 4L3 20h18L12 4z" fill="#6A6A6A"/>
            </svg>
          } 
          title="Task 02"
          description="Description. Lorem ipsum dolor sit amet, consectetur."
        />
        
        {/* Task 03 */}
        <TaskItem
          icon={
            <svg className="w-5 h-5" fill="none" stroke="" viewBox="" xmlns="http://www.w3.org/2000/svg">
              {/* This icon is a simple mountain shape, matching the image */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="" d="" fill="none"/> 
              <path d="" fill=""/>
            </svg>
          } // Task 03 has no icon in the image
          title="Task 03"
          description="Description. Lorem ipsum dolor sit amet, consectetur."
        />
      </div>
      
      {/* Removed the footer text as it is not visible in the final image crop */}
    </div>
  );
};