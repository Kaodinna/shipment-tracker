export interface TabBarLabelProps {
  focused: boolean;
  title: string;
}

export interface BottomsheetProps {
  translateY: any;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface formDataProps {
  email: string;
  password: string;
}
