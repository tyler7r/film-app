export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string
          id: number
          season: string | null
          team1_id: number
          team2_id: number
          tournament: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          season?: string | null
          team1_id: number
          team2_id: number
          tournament?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          season?: string | null
          team1_id?: number
          team2_id?: number
          tournament?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "games_team1_id_fkey"
            columns: ["team1_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_team2_id_fkey"
            columns: ["team2_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      plays: {
        Row: {
          created_at: string
          game_id: number | null
          highlight: boolean | null
          id: number
          keywords: string[] | null
        }
        Insert: {
          created_at?: string
          game_id?: number | null
          highlight?: boolean | null
          id?: number
          keywords?: string[] | null
        }
        Update: {
          created_at?: string
          game_id?: number | null
          highlight?: boolean | null
          id?: number
          keywords?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "plays_game_id_fkey"
            columns: ["game_id"]
            referencedRelation: "games"
            referencedColumns: ["id"]
          }
        ]
      }
      team_users: {
        Row: {
          created_at: string
          id: number
          team_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          team_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          team_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_users_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_users_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          affiliation_pwd: string | null
          city: string
          created_at: string
          division: string | null
          id: number
          logo: string
          name: string
        }
        Insert: {
          affiliation_pwd?: string | null
          city: string
          created_at?: string
          division?: string | null
          id?: number
          logo?: string
          name: string
        }
        Update: {
          affiliation_pwd?: string | null
          city?: string
          created_at?: string
          division?: string | null
          id?: number
          logo?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string | null
          role: string | null
          team_id: number | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
          team_id?: number | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
          role?: string | null
          team_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      users_plays: {
        Row: {
          created_at: string
          id: number
          play_id: number | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          play_id?: number | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          play_id?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "users_plays_play_id_fkey"
            columns: ["play_id"]
            referencedRelation: "plays"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_plays_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
