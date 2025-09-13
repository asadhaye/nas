import React from 'react';
import { RunningIcon, ScopeIcon, JointIcon, LigamentIcon, ShoulderIcon, ChildIcon } from '../components/icons';

// FIX: Define an interface for the condition data to ensure type safety.
// The `icon` property will now store the component itself, not a JSX element,
// to avoid using JSX in a .ts file.
interface ConditionData {
    icon: React.FC<{ className?: string }>;
    title: string;
    summary: string;
}

// FIX: Update the array to conform to the new interface. Instead of rendering the
// icon components here, we pass the component references. This resolves TypeScript
// errors caused by using JSX syntax in a `.ts` file.
export const conditionsData: ConditionData[] = [
    {
        icon: RunningIcon,
        title: "Sports Injury Management",
        summary: "Specialized care for injuries caused by overuse, direct impact, or excessive force to get you back in the game.",
    },
    {
        icon: ScopeIcon,
        title: "Arthroscopy",
        summary: "A minimally invasive procedure using a camera to diagnose and treat joint problems with faster recovery.",
    },
    {
        icon: JointIcon,
        title: "Joint Replacement",
        summary: "Surgical replacement of damaged joints like the hip and knee to relieve pain and restore function.",
    },
    {
        icon: LigamentIcon,
        title: "Ligament Reconstruction",
        summary: "Surgical repair or replacement of damaged ligaments, such as the ACL, to restore joint stability.",
    },
    {
        icon: ShoulderIcon,
        title: "Shoulder Surgery",
        summary: "Comprehensive surgical care for conditions like rotator cuff tears, arthritis, and instability.",
    },
    {
        icon: ChildIcon,
        title: "Paediatric Orthopedics",
        summary: "Specialist service for musculoskeletal conditions affecting children and adolescents.",
    }
];
