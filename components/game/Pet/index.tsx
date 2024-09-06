import Image from "next/image";

const Pet = ({ data, isAvatar = false }: { data: any; isAvatar?: boolean }) => {
  if (isAvatar) {
    return <Image src={data.avatar} alt={data.name} width={50} height={50} />;
  }
  return <Image src={data.image} alt={data.name} width={100} height={100} />;
};

export default Pet;
