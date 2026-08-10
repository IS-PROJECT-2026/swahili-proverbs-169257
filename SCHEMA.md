# Proverb Data Schema

Defines the structure used in `proverbs.json`.

## Entry shape

```json
{
  "id": 1,
  "proverb": "Haraka haraka haina baraka",
  "meaning": "Hurry hurry has no blessings.",
  "category": "patience"
}
```

## Fields

| Field     | Type   | Description                                      |
|-----------|--------|---------------------------------------------------|
| `id`      | number | Unique identifier, sequential starting at 1       |
| `proverb` | string | The Swahili proverb text                          |
| `meaning` | string | English meaning/interpretation                    |
| `category`| string | One of: wisdom, unity, patience, hard-work, caution, respect, perseverance, friendship |

## Notes

- `id` values must stay unique and stable — the quiz and progress-tracking
  features (Milestones 2 and 4) reference proverbs by `id`, not array index.
- New categories can be added, but existing category strings used in filter
  UI (Issue #11) must match exactly (case-sensitive, lowercase).