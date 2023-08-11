import {
  GridData,
  GridDataTypes,
} from '../../../../../../../shared/Globals/types/GridTypes';

export interface Content {
  end_date?: string;
  first_last_name?: string;
  is_active_flag?: string;
  is_active_flag_name?: string;
  login?: string;
  org_id?: number;
  org_name?: string;
  start_date?: string;
  user_id?: number;
}

interface GridDatas extends GridData {
  content?: Content[];
}

export interface UserGridDataTypes extends GridDataTypes {
  data?: GridDatas;
}
