export type CategoryList = {
  id: number;
  name: string;
  remark: string;
  pid: string;
  iconUrl: string;
  picUrl: string;
  sort: number;
  createTime: string;
  updateTime: string;
  subCategoryList: subCategoryList[];
};
export type subCategoryList = {
  id: number;
  name: string;
  remark: string;
  pid: string;
  iconUrl: string;
  picUrl: string;
  sort: number;
  createTime: string;
  updateTime: string;
};
