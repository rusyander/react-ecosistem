export interface SidebarItemType {
  text: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  path: string | null;
  authOnly?: boolean;
}
