from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime
import uuid

class ChangeLogBase(BaseModel):
    table_name: str
    record_id: uuid.UUID
    change_type: str = Field(..., pattern="^(create|update|delete)$")
    change_details: Dict[str, Any]

class ChangeLogCreate(ChangeLogBase):
    pass

class ChangeLogResponse(ChangeLogBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    
    class Config:
        orm_mode = True

class ChangeLogList(BaseModel):
    items: List[ChangeLogResponse]
    total: int
    page: int
    limit: int
    pages: int

class UserActivityBase(BaseModel):
    activity_type: str
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None
    details: Optional[Dict[str, Any]] = None

class UserActivityCreate(UserActivityBase):
    pass

class UserActivityResponse(UserActivityBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    
    class Config:
        orm_mode = True

class UserActivityList(BaseModel):
    items: List[UserActivityResponse]
    total: int
    page: int
    limit: int
    pages: int

class AuditLogFilterOptions(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    user_id: Optional[uuid.UUID] = None
    table_name: Optional[str] = None
    change_type: Optional[str] = None
    activity_type: Optional[str] = None
