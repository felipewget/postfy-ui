import { Checkbox, Flex, Image, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
// import icons from './icons';
import classes from './social-profile-select.module.css';

interface ImageCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  title: string;
  description: string;
  image: string;
}

export function ImageCheckbox({
  checked,
  defaultChecked,
  onChange,
  title,
  description,
  className,
  image,
  ...others
}: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <UnstyledButton
      {...others}
      onClick={() => handleChange(!value)}
      data-checked={value || undefined}
      className={classes.button}
    >
      <Image src={image} alt={title} w={40} h={40} />

      <div className={classes.body}>
        <Text c="dimmed" size="xs" lh={1} mb={5}>
          {description}
        </Text>
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

const mockdata = [
  { description: 'Sun and sea', title: 'Beach vacation', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
  { description: 'Sightseeing', title: 'City trips', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
  { description: 'Mountains', title: 'Hiking vacation', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
  { description: 'Snow and ice', title: 'Winter vacation', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
  { description: 'Mountains', title: 'Hiking vacation', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
  { description: 'Snow and ice', title: 'Winter vacation', image: 'https://cdn-icons-png.flaticon.com/512/9584/9584876.png' },
];

export function ImageCheckboxes() {
  const items = mockdata.map((item) => <ImageCheckbox {...item} key={item.title} />);
  return <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>{items}</SimpleGrid>;
}