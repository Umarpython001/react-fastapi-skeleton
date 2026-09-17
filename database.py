from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

postgresql_user = os.getenv("POSTGRESQL_USER")
postgresql_password = os.getenv("POSTGRESQL_PASSWORD")
db_name = os.getenv("DB_NAME")

# postgresql://{postgresql_user}:{postgresql_password}@localhost/db_name


SQLALCHEMY_DATABASE_URL=f"postgresql+psycopg2://postgres:{postgresql_password}@localhost:5432/{db_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()