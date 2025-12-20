nextapp/
src/
app/
(app)/
layout.tsx
dashboard/
page.tsx
inventory/
page.tsx
search/
page.tsx
create/
page.tsx

      api/
        openbis/
          spaces/
            route.ts          // POST create space
          favorites/
            route.ts          // POST/DELETE toggle favorite
          search/
            route.ts          // GET search endpoint (optional)
        auth/
          route.ts            // login/logout if you handle it here

      layout.tsx              // root layout (theme providers, html/body)
      page.tsx                // redirect to /dashboard or landing

    components/
      shell/
        TopNav.client.tsx     // hamburger, user menu, active nav
        AppShell.tsx          // server wrapper composing layout
      dashboard/
        QuickSearch.client.tsx
        CreateSpaceButton.client.tsx
        SpacesList.tsx
        SpaceCard.tsx
        FavoriteStar.client.tsx
        RecentActivityList.tsx
        ActivityItem.tsx

    lib/
      openbis/
        server.ts             // server-only openBIS client (fetch + auth)
        dto.ts                // types from openBIS API
        model.ts              // your normalized models for UI
        mapper.ts             // dto -> model
      auth/
        session.ts            // session/cookie helpers (server-only)
      cache/
        keys.ts               // cache tags/keys helpers

    styles/
      globals.css
