/**
 * Game Point Values
 * 
 * Centralizing these values ensures consistency across the application
 * and makes it easy to update each season.
 * 
 * IMPORTANT: These point values correspond to actions defined in:
 * - ScoringSections.tsx (action1-4, teleopSpecial)
 * - StatusToggles.tsx (option1-3, toggle1-2)
 * - transformation.ts (field names)
 * - scoring.ts (calculations)
 * 
 * When customizing for your game year, update ALL these files together.
 */

export const AUTO_POINTS = {
    ACTION_1: 3,  // Maps to ScoringSections "Action 1" button
    ACTION_2: 5,  // Maps to ScoringSections "Action 2" button
    ACTION_3: 2,  // Maps to ScoringSections "Action 3" button
    ACTION_4: 4,  // Maps to ScoringSections "Action 4" button
} as const;

export const TELEOP_POINTS = {
    ACTION_1: 2,        // Maps to ScoringSections "Action 1" button
    ACTION_2: 4,        // Maps to ScoringSections "Action 2" button
    ACTION_3: 3,        // Maps to ScoringSections "Action 3" button
    ACTION_4: 4,        // Maps to ScoringSections "Action 4" button
    TELEOP_SPECIAL: 5,  // Maps to ScoringSections "Teleop Special Action" button
} as const;

export const ENDGAME_POINTS = {
    OPTION_1: 10,  // Maps to StatusToggles endgame option1 (e.g., Climb Level 1)
    OPTION_2: 5,   // Maps to StatusToggles endgame option2 (e.g., Climb Level 2)
    OPTION_3: 2,   // Maps to StatusToggles endgame option3 (e.g., Park)
    TOGGLE_1: 0,   // Maps to StatusToggles endgame toggle1 (e.g., Climb Failed - no points)
    TOGGLE_2: 0,   // Maps to StatusToggles endgame toggle2 (e.g., Broke Down - no points)
} as const;

export const PENALTY_POINTS = {
    FOUL: 2,
    TECH_FOUL: 5,
} as const;
