/**
 * Game-Specific Data Transformation
 * 
 * This module transforms action arrays from match scouting into counter fields
 * for database storage. 
 * 
 * IMPORTANT: Field names here MUST match the UI components:
 * - Action types from ScoringSections.tsx → action1Count, action2Count, etc.
 * - Toggle names from StatusToggles.tsx → autoToggle, teleopToggle, option1, etc.
 * 
 * When you customize the UI, update this file to match!
 * 
 * PLACEHOLDER FIELD MAPPING:
 * ===========================
 * 
 * ScoringSections.tsx actions:
 *   - actionType: 'action1' → auto.action1Count / teleop.action1Count
 *   - actionType: 'action2' → auto.action2Count / teleop.action2Count
 *   - actionType: 'action3' → auto.action3Count / teleop.action3Count
 *   - actionType: 'action4' → auto.action4Count / teleop.action4Count
 *   - actionType: 'teleopSpecial' → teleop.teleopSpecialCount
 * 
 * StatusToggles.tsx fields:
 *   - Auto phase: autoToggle
 *   - Teleop phase: teleopToggle
 *   - Endgame phase: option1, option2, option3 (single selection)
 *   - Endgame phase: toggle1, toggle2 (multiple selection)
 */

import type { DataTransformation } from "@/types/game-interfaces";

export const gameDataTransformation: DataTransformation = {
  transformActionsToCounters(matchData) {
    // Extract start position index if available
    const selectedPosition = matchData.startPosition?.findIndex((pos: boolean) => pos === true);
    const startPosition = selectedPosition !== undefined && selectedPosition >= 0
      ? selectedPosition
      : null;

    // Initialize default structure
    // NOTE: Field names MUST match ScoringSections and StatusToggles components
    const result: Record<string, any> = {
      auto: {
        startPosition,
        // Action counters - match actionType values from ScoringSections
        action1Count: 0,
        action2Count: 0,
        action3Count: 0,
        action4Count: 0,
        // Status toggle - matches autoToggle from StatusToggles
        autoToggle: false,
      },
      teleop: {
        // Action counters - match actionType values from ScoringSections
        action1Count: 0,
        action2Count: 0,
        action3Count: 0,
        action4Count: 0,
        teleopSpecialCount: 0, // Teleop-only action from ScoringSections
        // Status toggle - matches teleopToggle from StatusToggles
        teleopToggle: false,
      },
      endgame: {
        // Single selection group - matches option1/2/3 from StatusToggles
        option1: false,
        option2: false,
        option3: false,
        // Multiple selection toggles - matches toggle1/2 from StatusToggles
        toggle1: false,
        toggle2: false,
      },
    };

    // Count actions from action arrays
    // Action types MUST match the actionType values in ScoringSections.tsx
    matchData.autoActions?.forEach((action: any) => {
      if (action.actionType === 'action1') result.auto.action1Count++;
      else if (action.actionType === 'action2') result.auto.action2Count++;
      else if (action.actionType === 'action3') result.auto.action3Count++;
      else if (action.actionType === 'action4') result.auto.action4Count++;
    });

    matchData.teleopActions?.forEach((action: any) => {
      if (action.actionType === 'action1') result.teleop.action1Count++;
      else if (action.actionType === 'action2') result.teleop.action2Count++;
      else if (action.actionType === 'action3') result.teleop.action3Count++;
      else if (action.actionType === 'action4') result.teleop.action4Count++;
      else if (action.actionType === 'teleopSpecial') result.teleop.teleopSpecialCount++;
    });

    // Copy robot status flags from StatusToggles
    // Field names MUST match the status object keys from StatusToggles
    if (matchData.autoRobotStatus) Object.assign(result.auto, matchData.autoRobotStatus);
    if (matchData.teleopRobotStatus) Object.assign(result.teleop, matchData.teleopRobotStatus);
    if (matchData.endgameRobotStatus) Object.assign(result.endgame, matchData.endgameRobotStatus);

    // Copy any additional fields that weren't processed above
    const additionalFields = { ...matchData };
    delete additionalFields.autoActions;
    delete additionalFields.teleopActions;
    delete additionalFields.autoRobotStatus;
    delete additionalFields.teleopRobotStatus;
    delete additionalFields.endgameRobotStatus;
    delete additionalFields.startPosition;

    Object.assign(result, additionalFields);

    return result;
  }
};

export default gameDataTransformation;
