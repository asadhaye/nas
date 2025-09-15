import React from 'react';
import { RunningIcon, ScopeIcon, JointIcon, LigamentIcon, ShoulderIcon, ChildIcon } from '../components/icons';

interface ConditionData {
    icon: React.FC<{ className?: string }>;
    title: string;
    summary: string;
    details: string;
}

export const conditionsData: ConditionData[] = [
    {
        icon: RunningIcon,
        title: "Sports Injury Management",
        summary: "Specialized care for injuries caused by overuse, direct impact, or excessive force to get you back in the game.",
        details: "Sports injuries require a specialized approach. We treat a wide range of conditions including sprains, strains, fractures, and ligament tears common in athletes. Our goal is to provide a rapid and accurate diagnosis, followed by a comprehensive treatment plan that may include physical therapy, minimally invasive procedures, and advanced surgical techniques to ensure a safe and speedy return to your sport."
    },
    {
        icon: ScopeIcon,
        title: "Arthroscopy",
        summary: "A minimally invasive procedure using a camera to diagnose and treat joint problems with faster recovery.",
        details: "Arthroscopy is a state-of-the-art surgical procedure that allows us to visualize, diagnose, and treat problems inside a joint through very small incisions. By inserting a tiny camera (arthroscope), we can repair damaged tissue, remove loose cartilage, or treat inflammation. This technique results in less pain, reduced scarring, and a significantly faster recovery period compared to traditional open surgery."
    },
    {
        icon: JointIcon,
        title: "Joint Replacement",
        summary: "Surgical replacement of damaged joints like the hip and knee to relieve pain and restore function.",
        details: "When a joint is severely damaged by arthritis or injury, a total joint replacement (arthroplasty) can offer significant pain relief and restore mobility. We specialize in both primary and revision hip and knee replacements, using the latest prosthetic implants and surgical techniques to ensure longevity and optimal function. Our comprehensive care includes pre-operative education and post-operative rehabilitation."
    },
    {
        icon: LigamentIcon,
        title: "Ligament Reconstruction",
        summary: "Surgical repair or replacement of damaged ligaments, such as the ACL, to restore joint stability.",
        details: "Ligaments are crucial for joint stability. An injury to a key ligament, like the Anterior Cruciate Ligament (ACL) in the knee, can lead to instability and further joint damage. We perform advanced ligament reconstruction surgery, often using a graft from another part of your body or a donor, to rebuild the damaged ligament and restore full stability and function to the joint."
    },
    {
        icon: ShoulderIcon,
        title: "Shoulder Surgery",
        summary: "Comprehensive surgical care for conditions like rotator cuff tears, arthritis, and instability.",
        details: "The shoulder is a complex joint prone to a variety of issues. We offer comprehensive care for conditions such as rotator cuff tears, shoulder impingement, recurrent dislocations (instability), and arthritis. Treatment options range from arthroscopic repairs to total shoulder replacement, all tailored to your specific condition and lifestyle to help you regain pain-free motion."
    },
    {
        icon: ChildIcon,
        title: "Paediatric Orthopedics",
        summary: "Specialist service for musculoskeletal conditions affecting children and adolescents.",
        details: "Children's musculoskeletal problems are different from those of adults. We provide specialized care for a wide range of pediatric orthopedic conditions, including congenital deformities, growth plate injuries, scoliosis, and sports-related injuries in young athletes. Our approach is gentle, patient, and focused on ensuring proper growth and development."
    }
];