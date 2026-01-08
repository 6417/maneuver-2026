/**
 * Game Scoring Calculations
 * 
 * Implements the ScoringCalculations interface using centralized constants.
 * 
 * IMPORTANT: Field names here MUST match transformation.ts!
 * When the UI/transformation changes, update this file to match.
 * 
 * Current field mapping (from ScoringSections + StatusToggles):
 * - auto: action1-4Count, autoToggle, startPosition
 * - teleop: action1-4Count, teleopSpecialCount, teleopToggle
 * - endgame: option1/2/3, toggle1/2
 */

import type { ScoringCalculations } from "@/types/game-interfaces";
import type { ScoutingEntryBase } from "@/types/scouting-entry";
import { AUTO_POINTS, TELEOP_POINTS, ENDGAME_POINTS } from "./constants";

/**
 * Standard game data structure
 * NOTE: Field names MUST match transformation.ts output
 */
export interface GameData {
    auto: {
        startPosition: number | null;
        // Action counters - match ScoringSections actionType values
        action1Count: number;
        action2Count: number;
        action3Count: number;
        action4Count: number;
        // Status toggle - matches StatusToggles autoToggle field
        autoToggle: boolean;
    };
    teleop: {
        // Action counters - match ScoringSections actionType values
        action1Count: number;
        action2Count: number;
        action3Count: number;
        action4Count: number;
        teleopSpecialCount: number; // Teleop-only action
        // Status toggle - matches StatusToggles teleopToggle field
        teleopToggle: boolean;
    };
    endgame: {
        // Single selection group - matches StatusToggles option1/2/3 fields
        option1: boolean;
        option2: boolean;
        option3: boolean;
        // Multiple selection toggles - matches StatusToggles toggle1/2 fields
        toggle1: boolean;
        toggle2: boolean;
    };
    [key: string]: unknown;
}

/**
 * Scouting entry type with game-specific data
 */
export interface ScoutingEntry extends ScoutingEntryBase {
    gameData: GameData;
}

export const scoringCalculations: ScoringCalculations<ScoutingEntry> = {
    calculateAutoPoints(entry) {
        const gameData = entry.gameData as GameData;
        return (
            (gameData?.auto?.action1Count || 0) * AUTO_POINTS.ACTION_1 +
            (gameData?.auto?.action2Count || 0) * AUTO_POINTS.ACTION_2 +
            (gameData?.auto?.action3Count || 0) * AUTO_POINTS.ACTION_3 +
            (gameData?.auto?.action4Count || 0) * AUTO_POINTS.ACTION_4
        );
    },

    calculateTeleopPoints(entry) {
        const gameData = entry.gameData as GameData;
        return (
            (gameData?.teleop?.action1Count || 0) * TELEOP_POINTS.ACTION_1 +
            (gameData?.teleop?.action2Count || 0) * TELEOP_POINTS.ACTION_2 +
            (gameData?.teleop?.action3Count || 0) * TELEOP_POINTS.ACTION_3 +
            (gameData?.teleop?.action4Count || 0) * TELEOP_POINTS.ACTION_4 +
            (gameData?.teleop?.teleopSpecialCount || 0) * TELEOP_POINTS.TELEOP_SPECIAL
        );
    },

    calculateEndgamePoints(entry) {
        const gameData = entry.gameData as GameData;
        let points = 0;
        if (gameData?.endgame?.option1) points += ENDGAME_POINTS.OPTION_1;
        if (gameData?.endgame?.option2) points += ENDGAME_POINTS.OPTION_2;
        if (gameData?.endgame?.option3) points += ENDGAME_POINTS.OPTION_3;
        return points;
    },

    calculateTotalPoints(entry) {
        return (
            this.calculateAutoPoints(entry) +
            this.calculateTeleopPoints(entry) +
            this.calculateEndgamePoints(entry)
        );
    }
};

export default scoringCalculations;
