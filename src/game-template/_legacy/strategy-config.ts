import { StrategyConfig } from "@/core/types/strategy";
import { scoringCalculations } from "./scoring";


export const strategyConfig: StrategyConfig = {
    columns: [
        // Team Info (Standard)
        { key: "teamNumber", label: "Team", category: "Team Info", visible: true, numeric: false },
        { key: "eventKey", label: "Event", category: "Team Info", visible: true, numeric: false },
        { key: "matchCount", label: "Matches", category: "Team Info", visible: true, numeric: true },

        // Point Totals (from calculations.ts)
        { key: "totalPoints", label: "Total Points", category: "Points", visible: true, numeric: true },
        { key: "autoPoints", label: "Auto Points", category: "Points", visible: true, numeric: true },
        { key: "teleopPoints", label: "Teleop Points", category: "Points", visible: true, numeric: true },
        { key: "endgamePoints", label: "Endgame Points", category: "Points", visible: true, numeric: true },

        // Overall Stats (from calculations.ts: overall.*)
        { key: "overall.avgTotalPoints", label: "Avg Total Pts", category: "Overall", visible: false, numeric: true },
        { key: "overall.totalPiecesScored", label: "Avg Pieces", category: "Overall", visible: true, numeric: true },
        { key: "overall.avgGamePiece1", label: "Avg Action 1+2", category: "Overall", visible: false, numeric: true },
        { key: "overall.avgGamePiece2", label: "Avg Action 3+4", category: "Overall", visible: false, numeric: true },

        // Auto Stats (from calculations.ts: auto.*)
        { key: "auto.avgPoints", label: "Auto Avg Pts", category: "Auto", visible: false, numeric: true },
        { key: "auto.avgGamePiece1", label: "Auto Action 1+2", category: "Auto", visible: true, numeric: true },
        { key: "auto.avgGamePiece2", label: "Auto Action 3+4", category: "Auto", visible: false, numeric: true },
        { key: "auto.mobilityRate", label: "Mobility %", category: "Auto", visible: true, numeric: true, percentage: true },

        // Teleop Stats (from calculations.ts: teleop.*)
        { key: "teleop.avgPoints", label: "Teleop Avg Pts", category: "Teleop", visible: false, numeric: true },
        { key: "teleop.avgGamePiece1", label: "Teleop Action 1+2", category: "Teleop", visible: true, numeric: true },
        { key: "teleop.avgGamePiece2", label: "Teleop Action 3", category: "Teleop", visible: false, numeric: true },

        // Endgame Stats (from calculations.ts: endgame.*)
        { key: "endgame.avgPoints", label: "Endgame Avg Pts", category: "Endgame", visible: false, numeric: true },
        { key: "endgame.option1Rate", label: "Option 1 %", category: "Endgame", visible: true, numeric: true, percentage: true },
        { key: "endgame.option2Rate", label: "Option 2 %", category: "Endgame", visible: true, numeric: true, percentage: true },
        { key: "endgame.option3Rate", label: "Option 3 %", category: "Endgame", visible: false, numeric: true, percentage: true },
        { key: "endgame.toggle1Rate", label: "Toggle 1 %", category: "Endgame", visible: false, numeric: true, percentage: true },
        { key: "endgame.toggle2Rate", label: "Toggle 2 %", category: "Endgame", visible: false, numeric: true, percentage: true },

        /* 
        // EXAMPLE: Game-Specific Columns (customize for your year)
        // When customizing, map to the actual keys returned by calculations.ts
        { key: "endgame.climbRate", label: "Climb %", category: "Endgame", visible: true, numeric: true, percentage: true },
        { key: "endgame.parkRate", label: "Park %", category: "Endgame", visible: true, numeric: true, percentage: true },
        */
    ],
    presets: {
        essential: ["teamNumber", "matchCount", "totalPoints", "overall.totalPiecesScored", "endgame.option1Rate"],
        auto: ["teamNumber", "matchCount", "autoPoints", "auto.avgGamePiece1", "auto.avgGamePiece2", "auto.mobilityRate"],
        teleop: ["teamNumber", "matchCount", "teleopPoints", "teleop.avgGamePiece1", "teleop.avgGamePiece2"],
        endgame: ["teamNumber", "matchCount", "endgamePoints", "endgame.option1Rate", "endgame.option2Rate", "endgame.toggle1Rate"],
        basic: ["teamNumber", "eventKey", "matchCount"]
    },
    aggregates: {
        // Point calculations use scoringCalculations from scoring.ts
        // These are called per-match and need the gameData structure
        totalPoints: (match) => scoringCalculations.calculateTotalPoints({ gameData: match } as any),
        autoPoints: (match) => scoringCalculations.calculateAutoPoints({ gameData: match } as any),
        teleopPoints: (match) => scoringCalculations.calculateTeleopPoints({ gameData: match } as any),
        endgamePoints: (match) => scoringCalculations.calculateEndgamePoints({ gameData: match } as any),
    }
}
