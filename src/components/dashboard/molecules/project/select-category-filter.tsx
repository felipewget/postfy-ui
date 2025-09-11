"use client";

import { useList } from "@/api/dashboard";
import { useGetProjectById } from "@/api/dashboard/project.api";
import { Client } from "@/declarators";
import { Select } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconUsersGroup } from "@tabler/icons-react";
import { FC, SetStateAction, useEffect, useMemo } from "react";
import { useState } from "react";

export const SelectCategoryFilter: FC<{
  projectId?: number;
  onChange: SetStateAction<any>;
}> = ({ onChange, projectId }) => {

    const { data: project, isLoading } = useGetProjectById(projectId ?? 0);

    const { data: dataCategories } = useList({
        entity: "categories",
        params: {},
    });

    const categories = (dataCategories?.pages.flat() ?? []) as Client[];
    
    const options = useMemo(() => {
        return (categories ?? [])
            .filter(category => (project.categories ?? []).includes(String(category.id)))
            .map((client: Client) => ({
                value: String(client.id),
                label: client.name,
            }));
    }, [categories, project]);
    
    // console.log('projectproject', project)

  // Use um estado para armazenar o valor do select
  const [value, setValue] = useState<string | null>(null);

  // Usa o useDebouncedState para atrasar a busca em 300ms
  const [search, setSearch] = useDebouncedState("", 300);

  return (
    <Select
      leftSection={<IconUsersGroup size="16px" />}
      radius="sm"
      placeholder="Pesquisar cliente..."
      nothingFoundMessage={
        isLoading ? "Carregando..." : "Nenhum cliente encontrado"
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
      data={options}
    />
  );
};
