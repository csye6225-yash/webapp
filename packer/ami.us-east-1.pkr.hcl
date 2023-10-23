packer {
  required_plugins {
    amazon = {
      source  = "github.com/hashicorp/amazon"
      version = ">= 1.0.0"
    }
  }


variable aws_region {
  type    = string
  default = "us-east-1"
}

variable "source-ami" {
  type    = string
  default = "ami-06db4d78cb1d3bbf9"
}

variable ssh_username {
  type    = string
  default = "admin"
}

variable subnet_id {
  type    = string
  default = "subnet-00ba965052f51f6b0"
}

source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  ami_name        = "cyse 6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for csye6225"
  profile         = "dev"
  ami_users       = ["014622572805", "162358691784"]

  ami_regions = [
    "us-east-1",
  ]

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }

  instance_type = "t2.micro"
  source_ami    = "${var.source-ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvdh"
    volume_size           = 8
    volume_type           = "gp2"
  }
}

build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "file" {
    source      = "./Yash_Bhatia_002791499_03.zip"
    destination = "/tmp/Yash_Bhatia_002791499_03.zip"
  }

  provisioner "shell" {
    script = "./setup.sh"
    environment_vars = [
      "DEBIAN_FRONTEND=noninteractive",
      "CHECKPOINT_DISABLE=1"
    ]

    // inline = [
    //     "sudo apt-get update",
    //     "sudo apt-get upgrade -y",
    //     "sudo apt-get install mariadb-server -y",
    //     "sudo apt-get clean",

    // ]
  }
}
