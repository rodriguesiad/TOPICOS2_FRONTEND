export const PerfilEnum = {
    ADMIN: { id: 1, label: 'Administrador' },
    FUNCIONARIO: { id: 2, label: 'Funcionário' },
    COMUM: { id: 3, label: 'Comum' },
  } as const;
  
  export type Perfil = keyof typeof PerfilEnum;