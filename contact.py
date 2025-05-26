from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Time
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime

from ..database import Base

class ContactSystem(Base):
    __tablename__ = "contact_systems"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    is_regular_hours = Column(Boolean, nullable=False)  # 通常受付時間帯か時間外か
    contact_method = Column(String(50), nullable=False)  # phone, email, other
    other_contact_method = Column(String(255), nullable=True)  # その他の場合の連絡方法
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # リレーションシップ
    customer = relationship("Customer", back_populates="contact_systems")
    contacts = relationship("Contact", back_populates="contact_system", cascade="all, delete-orphan")


class Contact(Base):
    __tablename__ = "contacts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    contact_system_id = Column(UUID(as_uuid=True), ForeignKey("contact_systems.id", ondelete="CASCADE"), nullable=False)
    priority = Column(Integer, nullable=False)  # 1: 第一連絡先, 2: 第二連絡先, 3: 第三連絡先
    contact_person = Column(String(100), nullable=False)  # 担当者名
    phone = Column(String(20), nullable=True)  # 電話番号
    email = Column(String(100), nullable=True)  # メールアドレス
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # リレーションシップ
    contact_system = relationship("ContactSystem", back_populates="contacts")


class ReceptionHour(Base):
    __tablename__ = "reception_hours"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    weekday = Column(Integer, nullable=False)  # 0: 日曜, 1: 月曜, ..., 6: 土曜
    start_time = Column(Time, nullable=False)  # 開始時間
    end_time = Column(Time, nullable=False)  # 終了時間
    is_holiday = Column(Boolean, default=False)  # 祝日扱いか
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # リレーションシップ
    customer = relationship("Customer", back_populates="reception_hours")


class ContactTrigger(Base):
    __tablename__ = "contact_triggers"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_id = Column(UUID(as_uuid=True), ForeignKey("customers.id", ondelete="CASCADE"), nullable=False)
    trigger_name = Column(String(100), nullable=False)  # トリガー名
    trigger_description = Column(String(255), nullable=True)  # トリガー詳細
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # リレーションシップ
    customer = relationship("Customer", back_populates="contact_triggers")
