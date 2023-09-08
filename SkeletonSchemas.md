1. User
    - user_id
    - role: coach, player, guest?
    - username
    - password
    - name
    if player
        - team affiliation? (team_id)
        - plays ([...plays_id])
        - inbox
    if coach
        - team affilation
        - inbox
    - posted highlights ([...plays_id])
    - liked highlights ([...plays_id])

2. Team
    - team_id
    - name
    - city
    - division
    - logo
    - roster ([...user_id(players)])
    - games ([...game_id])
    - notes(can only be seen or written by players/coaches with team affiliation)

3. Game
    - game_id
    - video link
    - team vs team (team1_id, team2_id)
    - tournament
    - season
    - plays ([...play_id])

4. Plays
    - play_id
    - author (user_id)
    - game (game_id)
    - duration (start, end)
    - players involved ([...user_id(players)])
    - note
    - keywords
    - highlight? (if yes, automatically posts to highlight feed)