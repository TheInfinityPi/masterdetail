import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Incident {
  incident_id: string;
  timestamp: string;
  duration_seconds: number;
  event_type: 'DOWNWARD_HEAD_TILT' | 'SLOUCHING';
  trigger_confidence: number;
  audio_prompt_delivered: string;
}

export interface SessionMetrics {
  total_work_minutes: number;
  distracted_minutes: number;
  focus_percentage: number;
}

export interface FocusSession {
  _id: string;
  session_id: string;
  user_id: string;
  start_timestamp: string;
  end_timestamp: string;
  metrics: SessionMetrics;
  incidents: Incident[];
}

@Component({
  selector: 'app-session-master-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="master-detail-container">
      <!-- MASTER PANE -->
      <div class="master-pane">
        <h2>Focus Sessions</h2>
        <div 
          *ngFor="let session of sessions" 
          class="session-card" 
          [class.selected]="session.session_id === selectedSession?.session_id"
          (click)="selectSession(session)">
          <div class="card-header">
            <span class="session-id">{{ session.session_id }}</span>
            <span class="focus-badge">{{ session.metrics.focus_percentage }}% Focus</span>
          </div>
          <div class="card-body">
            <p>Start: {{ session.start_timestamp | date:'short' }}</p>
            <p>Duration: {{ session.metrics.total_work_minutes }} mins | Incidents: {{ session.incidents.length }}</p>
          </div>
        </div>
      </div>

      <!-- DETAIL PANE -->
      <div class="detail-pane">
        <div *ngIf="selectedSession as sel; else noSelection">
          <h2>Session Analytics: {{ sel.session_id }}</h2>
          
          <div class="kpi-grid">
            <div class="kpi-card">
              <h3>Total Duration</h3>
              <p>{{ sel.metrics.total_work_minutes }} mins</p>
            </div>
            <div class="kpi-card">
              <h3>Focus Score</h3>
              <p>{{ sel.metrics.focus_percentage }}%</p>
            </div>
            <div class="kpi-card">
              <h3>Distracted Time</h3>
              <p>{{ sel.metrics.distracted_minutes }} mins</p>
            </div>
          </div>

          <h3>Incident Timeline ({{ sel.incidents.length }})</h3>
          <table class="incident-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Confidence</th>
                <th>Vocal Intervention Prompt</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let inc of sel.incidents">
                <td>{{ inc.timestamp | date:'mediumTime' }}</td>
                <td>
                  <span class="type-tag" [class.head-tilt]="inc.event_type === 'DOWNWARD_HEAD_TILT'">
                    {{ inc.event_type }}
                  </span>
                </td>
                <td>{{ inc.duration_seconds }}s</td>
                <td>{{ (inc.trigger_confidence * 100).toFixed(0) }}%</td>
                <td class="prompt-text">"{{ inc.audio_prompt_delivered }}"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #noSelection>
          <div class="placeholder-msg">
            <p>Select a session from the list on the left to view detailed telemetry and incident timeline.</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .master-detail-container { display: flex; gap: 20px; font-family: 'Segoe UI', sans-serif; }
    .master-pane { flex: 1; border-right: 2px solid #e2e8f0; padding-right: 15px; max-width: 350px; }
    .detail-pane { flex: 2; padding-left: 10px; }
    .session-card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; }
    .session-card:hover { border-color: #3b82f6; background: #f8fafc; }
    .session-card.selected { border-color: #2563eb; background: #eff6ff; box-shadow: 0 2px 4px rgba(37,99,235,0.1); }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
    .session-id { font-weight: bold; font-size: 0.9em; color: #1e293b; }
    .focus-badge { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; font-weight: 600; }
    .kpi-grid { display: flex; gap: 12px; margin-bottom: 20px; }
    .kpi-card { flex: 1; background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center; }
    .kpi-card h3 { margin: 0; font-size: 0.85em; color: #64748b; }
    .kpi-card p { margin: 6px 0 0; font-size: 1.4em; font-weight: bold; color: #0f172a; }
    .incident-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .incident-table th, .incident-table td { border: 1px solid #e2e8f0; padding: 8px 10px; text-align: left; font-size: 0.85em; }
    .incident-table th { background: #f8fafc; font-weight: 600; }
    .type-tag { font-weight: 600; font-size: 0.8em; padding: 2px 6px; border-radius: 4px; background: #fef3c7; color: #92400e; }
    .type-tag.head-tilt { background: #fee2e2; color: #991b1b; }
    .prompt-text { font-style: italic; color: #475569; }
    .placeholder-msg { text-align: center; padding: 60px 20px; color: #94a3b8; }
  `]
})
export class SessionMasterDetailComponent implements OnInit {
  sessions: FocusSession[] = [
    {
      _id: '66d8d48a12e3a89012f451b0',
      session_id: 'sess_2026_09_04_wksp_01',
      user_id: 'usr_dev_primary',
      start_timestamp: '2026-09-04T18:00:00.000Z',
      end_timestamp: '2026-09-04T18:45:00.000Z',
      metrics: { total_work_minutes: 45.0, distracted_minutes: 6.3, focus_percentage: 86.0 },
      incidents: [
        {
          incident_id: 'inc_001',
          timestamp: '2026-09-04T18:14:22.105Z',
          duration_seconds: 18.5,
          event_type: 'DOWNWARD_HEAD_TILT',
          trigger_confidence: 0.94,
          audio_prompt_delivered: 'Refocus: Screen engagement dropped below threshold.'
        },
        {
          incident_id: 'inc_002',
          timestamp: '2026-09-04T18:32:05.412Z',
          duration_seconds: 12.0,
          event_type: 'SLOUCHING',
          trigger_confidence: 0.88,
          audio_prompt_delivered: 'Posture check: Attention has dropped away from screen.'
        }
      ]
    },
    {
      _id: '66d8d48a12e3a89012f451b1',
      session_id: 'sess_2026_09_03_wksp_02',
      user_id: 'usr_dev_primary',
      start_timestamp: '2026-09-03T14:10:00.000Z',
      end_timestamp: '2026-09-03T15:10:00.000Z',
      metrics: { total_work_minutes: 60.0, distracted_minutes: 4.8, focus_percentage: 92.0 },
      incidents: [
        {
          incident_id: 'inc_101',
          timestamp: '2026-09-03T14:42:10.000Z',
          duration_seconds: 15.0,
          event_type: 'DOWNWARD_HEAD_TILT',
          trigger_confidence: 0.91,
          audio_prompt_delivered: 'Refocus: Screen engagement dropped below threshold.'
        }
      ]
    }
  ];

  selectedSession: FocusSession | null = null;

  ngOnInit(): void {
    if (this.sessions.length > 0) {
      this.selectedSession = this.sessions[0];
    }
  }

  selectSession(session: FocusSession): void {
    this.selectedSession = session;
  }
}