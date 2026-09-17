1. Setup instructions for alembic to automatically make migrations whenever I make a change to a DB schema.
    Run these two commands whenever a change is made to the schema...
        ```
            alembic revision --autogenerate -m "Initial migration"
            alembic upgrade head
        ```