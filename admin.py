from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime
import uuid

class DashboardSummary(BaseModel):
    total_customers: int
    active_customers: int
    customers_by_contact_method: Dict[str, int]
    recent_updates: int

class ExportOptions(BaseModel):
    format: str = Field(..., pattern="^(csv|xlsx)$")
    include_contact_systems: bool = True
    include_reception_hours: bool = True
    include_triggers: bool = True

class AdminDashboardSettings(BaseModel):
    default_page_size: int = Field(20, ge=1, le=100)
    default_sort_field: str = "customer_name"
    default_sort_order: str = Field("asc", pattern="^(asc|desc)$")
    columns_to_display: List[str] = ["customer_name", "system_name", "operation_start_date", "updated_at"]

class AdminDashboardSettingsUpdate(BaseModel):
    default_page_size: Optional[int] = Field(None, ge=1, le=100)
    default_sort_field: Optional[str] = None
    default_sort_order: Optional[str] = Field(None, pattern="^(asc|desc)$")
    columns_to_display: Optional[List[str]] = None

class AdminDashboardSettingsResponse(AdminDashboardSettings):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
