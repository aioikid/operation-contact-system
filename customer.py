from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

from ..database import Base

class Customer(Base):
    __tablename__ = "customers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    customer_name = Column(String(100), nullable=False)
    customer_address = Column(Text, nullable=True)
    end_user_name = Column(String(100), nullable=True)
    end_user_address = Column(Text, nullable=True)
    system_name = Column(String(100), nullable=True)
    operation_start_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # リレーションシップ
    user = relationship("User", back_populates="customer")
    contact_systems = relationship("ContactSystem", back_populates="customer", cascade="all, delete-orphan")
    reception_hours = relationship("ReceptionHour", back_populates="customer", cascade="all, delete-orphan")
    contact_triggers = relationship("ContactTrigger", back_populates="customer", cascade="all, delete-orphan")
