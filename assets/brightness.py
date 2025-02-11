from PIL import Image
import numpy as np
import os


def calculate_weighted_brightness(image_path):
    # 打开图片
    img = Image.open(image_path)

    # 将图片转换为灰度图（L模式）
    gray_img = img.convert('L')

    # 转换为 NumPy 数组
    img_array = np.array(gray_img)

    # 获取图像的高度和宽度
    height, width = img_array.shape

    # 创建一个权重矩阵，中心部分的权重更大，四周较小
    Y, X = np.ogrid[:height, :width]
    center_y, center_x = height // 2, width // 2

    # 计算距离中心的距离并归一化权重
    distance = np.sqrt((X - center_x) ** 2 + (Y - center_y) ** 2)
    max_distance = np.max(distance)

    # 创建权重矩阵，距离越近权重越高
    weight_matrix = 1 - (distance / max_distance)  # 归一化到0-1之间

    # 计算加权平均亮度
    weighted_brightness = np.sum(img_array * weight_matrix) / np.sum(weight_matrix)

    # 归一化亮度值到0-1之间，0表示黑色，255表示白色
    normalized_brightness = weighted_brightness / 255.0

    # 判断图片的色调
    if normalized_brightness > 0.5:
        color = 'light'
    else:
        color = 'dark'

    return normalized_brightness, color


def process_and_rename_images(image_folder):
    # 获取文件夹中所有图片文件的路径
    image_paths = [os.path.join(image_folder, filename) for filename in os.listdir(image_folder)
                   if filename.lower().endswith(('jpg', 'jpeg', 'png', 'webp'))]

    result = {}
    for image_path in image_paths:
        brightness, color = calculate_weighted_brightness(image_path)

        # 获取原始文件名和扩展名
        base_name, ext = os.path.splitext(os.path.basename(image_path))

        # 构造新的文件名：如 '1_d_0_35.jpg'
        new_name = f"{base_name}_{color}_{brightness:.2f}".replace('.', '_') + ext

        # 生成新的文件路径
        new_path = os.path.join(image_folder, new_name)

        # 重命名文件
        os.rename(image_path, new_path)

        result[image_path] = {
            'brightness': brightness,
            'color': color,
            'new_name': new_name
        }
    return result


# 示例：指定图片所在的文件夹路径
image_folder = "./bg"
image_info = process_and_rename_images(image_folder)

# 输出每张图片的新名字和亮度
for img_path, info in image_info.items():
    print(f"Original Image: {img_path}")
    print(f"New Image Name: {info['new_name']}")
    print(f"Brightness: {info['brightness']:.2f} (0 - dark, 1 - light)")
    print(f"Color: {info['color']}\n")
