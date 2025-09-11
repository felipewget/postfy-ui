"use client";

import { useList } from "@/api/dashboard";
import { Client, Project } from "@/declarators";
import { Select } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconUsersGroup } from "@tabler/icons-react";
import { FC, SetStateAction } from "react";
import { useState } from "react";

export const SelectProjectFilter: FC<{
  client_id?: number;
  onChange: SetStateAction<any>;
}> = ({onChange, client_id}) => {
  // Use um estado para armazenar o valor do select
  const [value, setValue] = useState<string | null>(null);

  // Usa o useDebouncedState para atrasar a busca em 300ms
  const [search, setSearch] = useDebouncedState("", 300);

  // Busca os dados da API usando o valor de `search`
  // Assumindo que seu `useList` funciona com paginação e busca
  const { data, isLoading } = useList({
    entity: "projects",
    params: {
      filters: {
        client_id
      }
    },
  });

  // Mapeia os dados para o formato que o Select do Mantine entende
  const mappedProjects = (data?.pages.flat() ?? []).map((project: Project) => ({
    value: String(project.id),
    label: project.title,
  }));

  return (
    <Select
      leftSection={<IconUsersGroup size="16px" />}
      radius="sm"
      placeholder="Pesquisar project..."
      nothingFoundMessage={
        isLoading ? "Carregando..." : "Nenhum project encontrado"
      }
      searchable // Ativa o campo de busca
      clearable // Adiciona um botão para limpar a seleção
      // Conecta o valor do Select ao estado `value`
      value={value}
      onChange={(value) => {
        onChange(value);
        setValue(value);
      }}
      // Conecta a busca do Select ao estado `search`
      onSearchChange={setSearch}
      data={mappedProjects}
    />
  );
};
