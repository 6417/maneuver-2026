/**
 * Team Card Stats Component
 * 
 * Displays inline statistics below the team name in the pick list.
 * This is year-specific - customize the displayed stats per game.
 */

import type { TeamStats } from '@/core/types/team-stats';

interface TeamCardStatsProps {
    team: TeamStats;
}

/**
 * Inline stats display for team cards.
 * Customize this component for each game year.
 */
export const TeamCardStats = ({ team }: TeamCardStatsProps) => {
    const auto = team.auto;
    const teleop = team.teleop;
    const endgame = team.endgame;

    return (
        <>
            <div className="text-xs text-muted-foreground">
                Auto: {auto?.avgGamePiece1?.toFixed(1) || 0} GP1, {auto?.avgGamePiece2?.toFixed(1) || 0} GP2
                {' | '}
                Teleop: {teleop?.avgGamePiece1?.toFixed(1) || 0} GP1, {teleop?.avgGamePiece2?.toFixed(1) || 0} GP2
            </div>
            <div className="text-xs text-muted-foreground">
                {endgame?.climbRate || 0}% climb • {team.matchCount || 0} matches
            </div>
        </>
    );
};
