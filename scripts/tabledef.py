# -*- coding: utf-8 -*-

import sys
import os
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

# Local
SQLALCHEMY_DATABASE_URI = 'sqlite:///accounts.db'

# Heroku
#SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

Base = declarative_base()


def db_connect():
    """
    Performs database connection using database settings from settings.py.
    Returns sqlalchemy engine instance
    """
    return create_engine(SQLALCHEMY_DATABASE_URI)


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(30), unique=True)
    password = Column(String(512))
    email = Column(String(50))
    #healthcare = Column(String(50))
    #age = Column(Integer)

    def __repr__(self):
        return '<User %r>' % self.username


class Symptom(Base):
    __tablename__ = "symptom"

    id = Column(Integer, primary_key=True)
    name = Column(String(30), unique=True)
    severity = Column(Integer)

    def __repr__(self):
        return '<Symptom %r>' % self.name


class Doctor(Base):
    __tablename__ = "doctor"

    id = Column(Integer, primary_key=True)
    username = Column(String(30), unique=True)
    specialty = Column(String(30))

    def __repr__(self):
        return '<Doctor %r>' % self.username


engine = db_connect()  # Connect to database
Base.metadata.create_all(engine)  # Create models
